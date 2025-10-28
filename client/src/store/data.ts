import { create } from "zustand";

export type User = {
	name: string;
	age: number;
	weight: number;
	height: number;
	gender: "M" | "F";
	level: string;
	objective: string;
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
		level: "",
		objective: "",
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
