import { link } from "fs/promises";
import React, { FC, useState, useEffect } from "react";
import Content from "../components/why/Content";
import { GetServerSideProps } from "next";

const links = [
	{
		id: 0,
		link: "100% Money back guarantee",
	},
	{
		id: 1,
		link: "24/7 Customer service",
	},
	{
		id: 2,
		link: "Encrypted Payment options",
	},
	{
		id: 3,
		link: "Free Worldwide Shipping",
	},
	{
		id: 4,
		link: "Standardized Gemstone Grading",
	},
	{
		id: 5,
		link: "360∘ 4K Gemstone Display",
	},
	{
		id: 6,
		link: "Our Packaging",
	},
	{
		id: 7,
		link: "Price Matching",
	},
	{
		id: 8,
		link: "Gemstone certification services",
	},
	{
		id: 9,
		link: "Virtual aapointment",
	},
	{
		id: 10,
		link: "Track your order",
	},
	{
		id: 11,
		link: "FAQs",
	},
	{
		id: 12,
		link: "Policies",
		subLinks: [
			{
				id: 12.1,
				link: "Privacy Policy",
			},
			{
				id: 12.2,
				link: "Return Policy",
			},
			{
				id: 12.3,
				link: "Terms and Conditions",
			},
		],
	},
	{
		id: 13,
		link: "Accessibility",
	},
];

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { data } = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/why-links?populate=*`
	).then((res) => res.json());

	//@ts-ignore
	const { why } = params;

	const parentLinks = data.filter((link: link) => {
		if (!link?.attributes?.parent_link?.data) {
			return link;
		} else {
		}
	});

	let id;

	parentLinks.map((link: link) => {
		if (link?.attributes?.slug === why) {
			id = parseInt(link.id);
		}
	});

	console.log("---------------");
	console.log(id);

	console.log("------------------");

	if (!id && why !== "why") {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			links: data,
			id,
		},
	};
};

type WhyProps = {
	links: link[];
	id?: number;
};

type link = {
	id: string;
	attributes: {
		Link: string;
		slug: string;
		parent_link: {
			data: [];
		};
		sub_links: {
			data: [];
		};
	};
};

const Why: FC<WhyProps> = ({ links, id }) => {
	const [selectedLink, setSelectedLink] = useState<number>(0);
	const [selectedSubLink, setSelectedSubLink] = useState<number>(0.1);
	const [idSelected, setIdSelected] = useState<number>(id || 1);

	const linksWithSubLinks = [];

	const parentLinks = links.filter((link: link) => {
		if (!link?.attributes?.parent_link?.data) {
			return link;
		} else {
		}
	});

	parentLinks.sort((a, b) => parseInt(a.id) - parseInt(b.id));

	useEffect(() => {
		id ? setIdSelected(id) : setIdSelected(parseInt(parentLinks[0].id));
		if (id) {
			parentLinks.map((link: link, i: number) => {
				if (parseInt(link?.id) === id) {
					setSelectedLink(i);
				}
			});
		}
	}, []);

	console.log(!!parentLinks[selectedLink]?.attributes.sub_links.data.length);

	return (
		<div className="flex justify-center w-full">
			<div className="relative flex justify-center w-full max-w-screen-lg pt-48 pb-20 2xl:max-w-screen-xl ">
				<div className="top-0 h-full pb-40 w-96">
					<div className="sticky flex flex-col border-r-2 top-72 ">
						{parentLinks?.map((link: link, i) => {
							return (
								<div
									key={link.id}
									onClick={() => {
										setSelectedLink(i);
										if (!link?.attributes.sub_links.data.length) {
											setIdSelected(parseInt(link.id));
										}
									}}
									className={`${
										selectedLink === i ? "text-purple-500 font-semibold" : ""
									} flex justify-end items-center w-full cursor-pointer`}
								>
									<div
										className={` ${
											selectedLink === i ? "" : "hover:text-violet-500"
										} flex-col flex w-80  justify-center items-start transition-all duration-150 ${
											selectedLink === i &&
											link?.attributes.sub_links?.data?.length
												? "h-44 text-purple-300"
												: "h-12"
										} mb-4`}
									>
										{link.attributes.Link}

										<div
											className={`flex flex-col pl-4 mt-4 ${
												!!link?.attributes.sub_links.data.length &&
												selectedLink == i
													? "h-48"
													: "h-0 hidden"
											} font-normal w-full transition-all duration-300 overflow-hidden relative text-neutral-800`}
										>
											{link?.attributes.sub_links?.data?.map((subLink: any) => {
												return (
													<div
														key={subLink.id}
														onClick={() => {
															setSelectedSubLink(subLink.id);
															setIdSelected(subLink.id);
														}}
														className="mb-6"
													>
														<div
															className={`${
																selectedSubLink === subLink.id &&
																"text-purple-600 border-r-2 border-purple-600 right-0 font-semibold"
															} flex items-center justify-start w-full h-6`}
														>
															{subLink?.attributes?.Link}
														</div>
													</div>
												);
											})}
										</div>
									</div>
								</div>
							);
						})}
						<div
							style={{
								top: (selectedLink / parentLinks?.length) * 100 + "%",
							}}
							className={` transition-all ${
								!!parentLinks[selectedLink]?.attributes.sub_links.data.length
									? "opacity-0"
									: "opacity-100"
							} bg-purple-500 duration-200 absolute w-1 h-12 rounded-full -right-[3px]`}
						></div>
					</div>
				</div>
				<div className="w-full">
					<div>
						<Content id={idSelected} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Why;
