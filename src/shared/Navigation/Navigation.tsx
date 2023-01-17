import React, { useEffect, useState } from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION_DEMO_2 } from "../../data/navigation";
import { fetchStrapi } from "../../lib/strapi";
import { NavItemType } from "./NavigationItem";

function Navigation() {
	const [navigation, setNavigation] = useState<NavItemType[]>();
	const fetchHeaderBuilder = async () => {
		const rawHeaderBuilder = await fetchStrapi("/navigation-builders", {
			filters: {
				active: true,
			},
		});
		setNavigation(rawHeaderBuilder.data[0]?.attributes.headerJson);
	};
	useEffect(() => {
		fetchHeaderBuilder();
	}, []);
	return (
		<ul className="flex items-center nc-Navigation">
			{navigation ? (
				navigation.map((item) => (
					<NavigationItem key={item.id} menuItem={item} />
				))
			) : (
				<>loading...</>
			)}
		</ul>
	);
}

export default Navigation;
