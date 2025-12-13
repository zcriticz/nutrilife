import bcrypt from "bcrypt";
import { randomBytes } from "crypto";
import { database } from "../lib/database";

export interface RegisterData {
	email: string;
	password: string;
	name: string;
}

export interface LoginData {
	email: string;
	password: string;
}

class AuthService {
	async register({ email, password, name }: RegisterData) {
		const existingUser = database.findUserByEmail(email);

		if (existingUser) {
			throw new Error("Email já cadastrado");
		}

		const hashedPassword = await bcrypt.hash(password, 8);

		const user = database.createUser(email, hashedPassword, name);

		return {
			id: user.id,
			email: user.email,
			name: user.name || "",
			createdAt: user.createdAt,
		};
	}

	async login({ email, password }: LoginData) {
		const user = database.findUserByEmail(email);

		if (!user) {
			throw new Error("Email ou senha inválidos");
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			throw new Error("Email ou senha inválidos");
		}

		return {
			id: user.id,
			email: user.email,
			name: user.name || "",
		};
	}

	async getUserById(userId: string) {
		const user = database.findUserById(userId);

		if (!user) {
			throw new Error("Usuário não encontrado");
		}

		return {
			id: user.id,
			email: user.email,
			name: user.name || "",
			createdAt: user.createdAt,
		};
	}

	async forgotPassword(email: string) {
		const user = database.findUserByEmail(email);

		if (!user) {
			return {
				message:
					"Se o email existir, você receberá um link para redefinir sua senha",
			};
		}

		const token = randomBytes(32).toString("hex");

		const expiresAt = new Date();
		expiresAt.setHours(expiresAt.getHours() + 1);

		database.createPasswordResetToken(user.id, token, expiresAt.toISOString());

		return {
			message:
				"Se o email existir, você receberá um link para redefinir sua senha",
			token: token, // Remover em produção
		};
	}

	async resetPassword(token: string, newPassword: string) {
		const resetToken = database.findPasswordResetToken(token);

		if (!resetToken) {
			throw new Error("Token inválido ou já utilizado");
		}

		const now = new Date();
		const expiresAt = new Date(resetToken.expiresAt);

		if (now > expiresAt) {
			throw new Error("Token expirado. Solicite um novo link de redefinição");
		}

		const hashedPassword = await bcrypt.hash(newPassword, 8);

		database.updateUserPassword(resetToken.userId, hashedPassword);

		database.markPasswordResetTokenAsUsed(token);

		return {
			message: "Senha redefinida com sucesso",
		};
	}
}

export { AuthService };
