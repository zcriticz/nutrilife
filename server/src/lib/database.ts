import Database from "better-sqlite3";
import { randomUUID } from "crypto";

const dbPath = process.env.DATABASE_URL?.replace("file:", "") || "./dev.db";
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
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
`);

export interface User {
	id: string;
	email: string;
	password: string;
	name: string | null;
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

export const database = {
	findUserByEmail: (email: string): User | undefined => {
		const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
		return stmt.get(email) as User | undefined;
	},

	findUserById: (id: string): User | undefined => {
		const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
		return stmt.get(id) as User | undefined;
	},

	createUser: (email: string, password: string, name: string | null): User => {
		const id = randomUUID();
		const now = new Date().toISOString();
		const stmt = db.prepare(
			"INSERT INTO users (id, email, password, name, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)"
		);
		stmt.run(id, email, password, name || null, now, now);
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
		const stmt = db.prepare(
			"INSERT INTO nutrition_plans (id, userId, data, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)"
		);
		stmt.run(id, userId, data, now, now);
		return {
			id,
			userId,
			data,
			createdAt: now,
			updatedAt: now,
		};
	},

	getNutritionPlansByUserId: (userId: string): NutritionPlan[] => {
		const stmt = db.prepare(
			"SELECT * FROM nutrition_plans WHERE userId = ? ORDER BY createdAt DESC"
		);
		return stmt.all(userId) as NutritionPlan[];
	},

	getNutritionPlanById: (
		planId: string,
		userId: string
	): NutritionPlan | undefined => {
		const stmt = db.prepare(
			"SELECT * FROM nutrition_plans WHERE id = ? AND userId = ?"
		);
		return stmt.get(planId, userId) as NutritionPlan | undefined;
	},
};

export default db;
