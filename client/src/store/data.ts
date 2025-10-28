import { create } from "zustand";

export type Level = "nenhum" | "leve" | "moderado" | "pesado";
export type Objective = "hipertrofia" | "definição" | "emagrecimento";

export type User = {
	name: string;
	age: number;
	weight: number;
	height: number;
	gender: "M" | "F";
	level: Level;
	objective: Objective;
};

type DataState = {
	user: User;
	setPageOne: (data: Omit<User, "level" | "objective">) => void;
	setPageTwo: (data: Pick<User, "level" | "objective">) => void;
};

export const useDataStore = create<DataState>((set) => ({
	user: {
		name: "",
		age: 0,
		weight: 0,
		height: 0,
		level: "nenhum",
		objective: "hipertrofia",
		gender: "M",
	},
	setPageOne: (data) =>
		set((state) => ({
			user: { ...state.user, ...data },
		})),
	setPageTwo: (data) =>
		set((state) => ({
			user: { ...state.user, ...data },
		})),
}));
