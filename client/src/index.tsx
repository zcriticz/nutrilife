import { registerRootComponent } from "expo";

registerRootComponent(Index);

import MainRoutes from "./routes/mainRoutes";

export default function Index() {
	return <MainRoutes />;
}
