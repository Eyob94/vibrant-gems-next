import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
//@ts-ignore
import { Markup } from "react-render-markup";

type ContentProps = {
	id: number;
};

const Content: FC<ContentProps> = ({ id }) => {
	const [pageContent, setPageContent] = useState<string>();

	console.log(id);

	useEffect(() => {
		const fn = async () => {
			const url = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/why-pages?filters[why_link][id][$eq]=${id}`;

			console.log(url);

			const { data } = await fetch(url).then((res) => res.json());

			data && setPageContent(data[0]?.attributes?.Content);
		};

		fn();
	}, [id]);

	console.log(pageContent);

	return (
		<div>
			<div className="flex flex-col gap-16 px-28">
				<Markup markup={pageContent} />
			</div>
		</div>
	);
};

export default Content;
