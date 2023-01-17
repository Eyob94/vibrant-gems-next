import Logo from "../Logo/Logo";
import SocialsList1 from "../SocialsList1/SocialsList1";
import { CustomLink } from "../../data/types";
import React, { useEffect, useState } from "react";
import { fetchStrapi } from "../../lib/strapi";
import { NavItemType } from "../Navigation/NavigationItem";

export interface WidgetFooterMenu {
	id: string;
	title: string;
	menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
	{
		id: "5",
		title: "Getting started",
		menus: [
			{ href: "#", label: "Release Notes" },
			{ href: "#", label: "Upgrade Guide" },
			{ href: "#", label: "Browser Support" },
			{ href: "#", label: "Dark Mode" },
		],
	},
	{
		id: "1",
		title: "Explore",
		menus: [
			{ href: "#", label: "Prototyping" },
			{ href: "#", label: "Design systems" },
			{ href: "#", label: "Pricing" },
			{ href: "#", label: "Security" },
		],
	},
	{
		id: "2",
		title: "Resources",
		menus: [
			{ href: "#", label: "Best practices" },
			{ href: "#", label: "Support" },
			{ href: "#", label: "Developers" },
			{ href: "#", label: "Learn design" },
		],
	},
	{
		id: "4",
		title: "Community",
		menus: [
			{ href: "#", label: "Discussion Forums" },
			{ href: "#", label: "Code of Conduct" },
			{ href: "#", label: "Contributing" },
			{ href: "#", label: "API Reference" },
		],
	},
];

const Footer: React.FC = () => {
	const [navigation, setNavigation] = useState<WidgetFooterMenu[]>();
	const fetchHeaderBuilder = async () => {
		const rawNavigationBuilders = await fetchStrapi("/navigation-builders", {
			filters: {
				active: true,
			},
		});
		setNavigation(rawNavigationBuilders.data[0]?.attributes.footerJson);
	};
	useEffect(() => {
		fetchHeaderBuilder();
	}, []);
	const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
		return (
			<div key={index} className="text-sm">
				<h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
					{menu.title}
				</h2>
				<ul className="mt-5 space-y-4">
					{menu.menus.map((item, index) => (
						<li key={index}>
							<a
								key={index}
								className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
								href={item.href}
								target="_blank"
								rel="noopener noreferrer"
							>
								{item.label}
							</a>
						</li>
					))}
				</ul>
			</div>
		);
	};

	return (
		<div className="relative py-20 border-t nc-Footer lg:pt-28 lg:pb-24 border-neutral-200 dark:border-neutral-700">
			<div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 ">
				<div className="grid grid-cols-4 col-span-2 gap-5 md:col-span-4 lg:md:col-span-1 lg:flex lg:flex-col">
					<div className="col-span-2 md:col-span-1">
						<Logo />
					</div>
					<div className="flex items-center col-span-2 md:col-span-3">
						<SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
					</div>
				</div>
				{navigation ? navigation.map(renderWidgetMenuItem) : <>loading</>}
			</div>
		</div>
	);
};

export default Footer;
