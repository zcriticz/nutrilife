import Database from "better-sqlite3";
import { randomUUID } from "crypto";

const dbPath = process.env.DATABASE_URL?.replace("file:", "") || "./dev.db";
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS nutrition_plans (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    data TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_nutrition_plans_userId ON nutrition_plans(userId);

  CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expiresAt TEXT NOT NULL,
    used INTEGER DEFAULT 0,
    createdAt TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
  CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_userId ON password_reset_tokens(userId);
`);

export interface User {
	id: string;
	email: string;
	password: string;
	name: string;
	createdAt: string;
	updatedAt: string;
}

export interface NutritionPlan {
	id: string;
	userId: string;
	data: string;
	createdAt: string;
	updatedAt: string;
}

export interface PasswordResetToken {
	id: string;
	userId: string;
	token: string;
	expiresAt: string;
	used: number;
	createdAt: string;
}

export const database = {
	findUserByEmail: (email: string): User | undefined => {
		const query = db.prepare("SELECT * FROM users WHERE email = ?");
		return query.get(email) as User | undefined;
	},

	findUserById: (id: string): User | undefined => {
		const query = db.prepare("SELECT * FROM users WHERE id = ?");
		return query.get(id) as User | undefined;
	},

	createUser: (email: string, password: string, name: string): User => {
		const id = randomUUID();
		const now = new Date().toISOString();
		const query = db.prepare(
			"INSERT INTO users (id, email, password, name, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)"
		);
		query.run(id, email, password, name, now, now);
		return {
			id,
			email,
			password,
			name,
			createdAt: now,
			updatedAt: now,
		};
	},

	createNutritionPlan: (userId: string, data: string): NutritionPlan => {
		const id = randomUUID();
		const now = new Date().toISOString();
		const query = db.prepare(
			"INSERT INTO nutrition_plans (id, userId, data, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)"
		);
		query.run(id, userId, data, now, now);
		return {
			id,
			userId,
			data,
			createdAt: now,
			updatedAt: now,
		};
	},

	getNutritionPlansByUserId: (userId: string): NutritionPlan[] => {
		const query = db.prepare(
			"SELECT * FROM nutrition_plans WHERE userId = ? ORDER BY createdAt DESC"
		);
		return query.all(userId) as NutritionPlan[];
	},

	getNutritionPlanById: (
		planId: string,
		userId: string
	): NutritionPlan | undefined => {
		const query = db.prepare(
			"SELECT * FROM nutrition_plans WHERE id = ? AND userId = ?"
		);
		return query.get(planId, userId) as NutritionPlan | undefined;
	},

	createPasswordResetToken: (
		userId: string,
		token: string,
		expiresAt: string
	): PasswordResetToken => {
		const id = randomUUID();
		const now = new Date().toISOString();
		const query = db.prepare(
			"INSERT INTO password_reset_tokens (id, userId, token, expiresAt, used, createdAt) VALUES (?, ?, ?, ?, 0, ?)"
		);
		query.run(id, userId, token, expiresAt, now);
		return {
			id,
			userId,
			token,
			expiresAt,
			used: 0,
			createdAt: now,
		};
	},

	findPasswordResetToken: (token: string): PasswordResetToken | undefined => {
		const query = db.prepare(
			"SELECT * FROM password_reset_tokens WHERE token = ? AND used = 0"
		);
		return query.get(token) as PasswordResetToken | undefined;
	},

	markPasswordResetTokenAsUsed: (token: string): void => {
		const query = db.prepare(
			"UPDATE password_reset_tokens SET used = 1 WHERE token = ?"
		);
		query.run(token);
	},

	updateUserPassword: (userId: string, hashedPassword: string): void => {
		const now = new Date().toISOString();
		const query = db.prepare(
			"UPDATE users SET password = ?, updatedAt = ? WHERE id = ?"
		);
		query.run(hashedPassword, now, userId);
	},
};

export default db;
