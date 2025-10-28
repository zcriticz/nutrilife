interface RefeicoesProps {
	horario: string;
	nome: string;
	alimentos: string[];
}

interface MacronutrientesProps {
	proteinas?: string;
	carboidratos?: string;
	gorduras?: string;
}

export interface Data {
	nome: string;
	genero?: string;
	sexo?: string;
	idade?: number;
	peso?: string;
	altura?: string;
	weight?: number;
	height?: number;
	nivelAtividadeFisica?: string;
	objetivo?: string;
	caloriasDiarias?: number;
	macronutrientes?: MacronutrientesProps;
	refeicoes?: RefeicoesProps[];
	recomendacoes?: string[];
	hidratacao?: string;
}
