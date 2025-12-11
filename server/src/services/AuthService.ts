import bcrypt from "bcrypt";
import { database } from "../lib/database";

export interface RegisterData {
	email: string;
	password: string;
	name?: string;
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

		const user = database.createUser(email, hashedPassword, name || null);

		return {
			id: user.id,
			email: user.email,
			name: user.name,
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
			name: user.name,
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
			name: user.name,
			createdAt: user.createdAt,
		};
	}
}

export { AuthService };
