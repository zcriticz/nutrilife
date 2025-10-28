import { registerRootComponent } from "expo";

import MainRoutes from "./routes/mainRoutes";

export default function Index() {
	return <MainRoutes />;
}

registerRootComponent(Index);
