import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import StackComponent from "./stackRoutes";

export default function MainRoutes() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<NavigationContainer>
				<StackComponent />
			</NavigationContainer>
		</QueryClientProvider>
	);
}
