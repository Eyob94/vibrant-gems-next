import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
//@ts-ignore
import { Markup } from "react-render-markup";

type ContentProps = {
	id: number;
};

const Content: FC<ContentProps> = ({ id }) => {
	const [pageContent, setPageContent] = useState<string>("");
	const [loading, setLoading] = useState<Boolean>();
	const [error, setError] = useState<Boolean>();

	console.log(pageContent);

	useEffect(() => {
		const fn = async () => {
			setLoading(true);
			const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/why-pages?filters[why_link][id][$eq]=${id}`;

			console.log(url);

			const { data } = await fetch(url).then((res) => res.json());

			setPageContent(data[0]?.attributes?.Content);
			setLoading(false);
		};

		try {
			fn();
		} catch (err) {
			setLoading(false);
			setError(true);
		}
	}, [id]);

	if (loading)
		return (
			<div className="flex items-center justify-center h-full">Loading...</div>
		);

	if (error)
		return (
			<div className="flex items-center justify-center h-full px-8">
				Something went wrong
			</div>
		);

	if (!pageContent)
		return (
			<div className="flex items-center justify-center h-full px-8">Empty</div>
		);

	return (
		<div>

			<div className=" px-28">
				<Markup markup={pageContent} />

			</div>
		</div>
	);
};

export default Content;
