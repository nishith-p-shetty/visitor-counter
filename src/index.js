addEventListener("fetch", (event) => {
	event.respondWith(
		handleRequest(event.request).catch(
			(err) => new Response(err.stack, { status: 500 })
		)
	);
});

async function handleRequest(request) {
	const { pathname } = new URL(request.url);
	const asvg = "<svg  xmlns=\"http://www.w3.org/2000/svg\"  width=\"100%\"  height=\"23px\"  fill=\"none\"><foreignObject width=\"100%\" height=\"23px\"><div xmlns=\"http://www.w3.org/1999/xhtml\"><style>.pill{    display: flex;    background-color: transparent;    width: max-content;    font-family: 'Open Sans', sans-serif;    border-radius: 4px;}.pill-label{    display: flex;    width: max-content;    padding: 4px;    padding-left: 8px;    padding-right: 8px;    border-top-left-radius: 4px;    border-bottom-left-radius: 4px;    font-size: 12px;}.pill-icon{  margin-right: 4px;  width: 14px;  height: 14px;}.pill-count{    color: white;    width: max-content;    border-top-right-radius: 4px;    border-bottom-right-radius: 4px;    padding: 4px;    padding-left: 8px;    padding-right: 8px;    letter-spacing: 1px;    font-size: 12px;}.cyan {  color: rgb(22 78 99);  background-color: rgb(165 243 252);}.blue {  color: rgb(30 58 138);  background-color: rgb(191 219 254);}.amber {  color: rgb(120 53 15);  background-color: rgb(253 230 138);}.green {  color: rgb(20 83 45);  background-color: rgb(187 247 208);}.red {  color: rgb(127 29 29);  background-color: rgb(254 202 202);}.rose {  color: rgb(136 19 55);  background-color: rgb(254 205 211);}.indigo {  color: rgb(49 46 129);  background-color: rgb(199 210 254);}.orange {  color: rgb(136 19 55);  background-color: rgb(254 215 170);}.emerald {  color: rgb(6 78 59);  background-color: rgb(167 243 208);}.teal {  color: rgb(19 78 74);  background-color: rgb(153 246 228);}.pink {  color: rgb(131 24 67);  background-color: rgb(251 207 232);}.fuchsia {  color: rgb(112 26 117);  background-color: rgb(245 208 254);}.neutral {  color: rgb(23 23 23);  background-color: rgb(229 229 229);}.dark-cyan {  background-color: rgb(22 78 99);  color: rgb(165 243 252);}.dark-blue {  background-color: rgb(30 58 138);  color: rgb(191 219 254);}.dark-amber {  background-color: rgb(120 53 15);  color: rgb(253 230 138);}.dark-green {  background-color: rgb(20 83 45);  color: rgb(187 247 208);}.dark-red {  background-color: rgb(127 29 29);  color: rgb(254 202 202);}.dark-rose {  background-color: rgb(136 19 55);  color: rgb(254 205 211);}.dark-indigo {  background-color: rgb(49 46 129);  color: rgb(199 210 254);}.dark-orange {  background-color: rgb(136 19 55);  color: rgb(254 215 170);}.dark-emerald {  background-color: rgb(6 78 59);  color: rgb(167 243 208);}.dark-teal {  background-color: rgb(19 78 74);  color: rgb(153 246 228);}.dark-pink {  background-color: rgb(131 24 67);  color: rgb(251 207 232);}.dark-fuchsia {  background-color: rgb(112 26 117);  color: rgb(245 208 254);}.dark-neutral {  background-color: rgb(23 23 23);  color: rgb(229 229 229);}</style><div class=\"pill\"><span class=\"pill-label dark-indigo\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"pill-icon\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">  <path name=\"cursor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122\" /></svg>Profile Views</span><span class=\"pill-count indigo\" >";
	const bsvg = "</span></div></div></foreignObject></svg>";

	//list
	if (pathname.startsWith("/list")) {
		const value = await visitors.list();
		return new Response(JSON.stringify(value.keys));
	}

	// nps show
	if (pathname.startsWith("/nps/s")) {
		return new Response((asvg + (await visitors.get("nps")) + bsvg), {
			headers: {
			  'content-type': 'image/svg+xml;charset=UTF-8',
			},
		  });
	}
	//nps increment
	if (pathname.startsWith("/nps/i")) {
		val = await visitors.get("nps")
		val = parseInt(val) + 1 
		await visitors.put("nps", val);
		return new Response((asvg + (await visitors.get("nps")) + bsvg), {
			headers: {
			  'content-type': 'image/svg+xml;charset=UTF-8',
			},
		  });
	}
	//nps reset
	if (pathname.startsWith("/nps/r")) {
		await visitors.put("nps", 0);
		return new Response((asvg + (await visitors.get("nps")) + bsvg), {
			headers: {
			  'content-type': 'image/svg+xml;charset=UTF-8',
			},
		  });
	}

	// bhu show
	if (pathname.startsWith("/bhu/s")) {
		return new Response((asvg + (await visitors.get("bhu")) + bsvg), {
			headers: {
			  'content-type': 'image/svg+xml;charset=UTF-8',
			},
		  });
	}
	//bhu increment
	if (pathname.startsWith("/bhu/i")) {
		val = await visitors.get("bhu")
		val = parseInt(val) + 1 
		await visitors.put("bhu", val);
		return new Response((asvg + (await visitors.get("bhu")) + bsvg), {
			headers: {
			  'content-type': 'image/svg+xml;charset=UTF-8',
			},
		  });
	}
	//bhu reset
	if (pathname.startsWith("/bhu/r")) {
		await visitors.put("bhu", 0);
		return new Response((asvg + (await visitors.get("bhu")) + bsvg), {
			headers: {
			  'content-type': 'image/svg+xml;charset=UTF-8',
			},
		  });
	}

	return Response.redirect("https://github.com/nishith-p-shetty/visitor-counter");
}
