addEventListener("fetch", (event) => {
	event.respondWith(
		handleRequest(event.request).catch(
			(err) => new Response(err.stack, { status: 500 })
		)
	);
});

async function handleRequest(request) {

	const { pathname } = new URL(request.url);     //path
	const params = new URL(request.url).searchParams;       //parameters

	//svg
	const asvg = '<svg  xmlns="http://www.w3.org/2000/svg"  width="127px"  height="23px"  fill="none"><foreignObject width="100%" height="23px"><div xmlns="http://www.w3.org/1999/xhtml"><style>.pill{    display: flex;    background-color: transparent;    width: max-content;    font-family: \'Open Sans\', sans-serif;    border-radius: 4px;}.pill-label{    display: flex;    width: max-content;    padding: 4px;    padding-left: 8px;    padding-right: 8px;    border-top-left-radius: 4px;    border-bottom-left-radius: 4px;    font-size: 12px;}.pill-icon{  margin-right: 4px;  width: 14px;  height: 14px;}.pill-count{    color: white;    width: max-content;    border-top-right-radius: 4px;    border-bottom-right-radius: 4px;    padding: 4px;    padding-left: 8px;    padding-right: 8px;    letter-spacing: 1px;    font-size: 12px;}.cyan {  color: rgb(22 78 99);  background-color: rgb(165 243 252);}.blue {  color: rgb(30 58 138);  background-color: rgb(191 219 254);}.amber {  color: rgb(120 53 15);  background-color: rgb(253 230 138);}.green {  color: rgb(20 83 45);  background-color: rgb(187 247 208);}.red {  color: rgb(127 29 29);  background-color: rgb(254 202 202);}.rose {  color: rgb(136 19 55);  background-color: rgb(254 205 211);}.indigo {  color: rgb(49 46 129);  background-color: rgb(199 210 254);}.orange {  color: rgb(136 19 55);  background-color: rgb(254 215 170);}.emerald {  color: rgb(6 78 59);  background-color: rgb(167 243 208);}.teal {  color: rgb(19 78 74);  background-color: rgb(153 246 228);}.pink {  color: rgb(131 24 67);  background-color: rgb(251 207 232);}.fuchsia {  color: rgb(112 26 117);  background-color: rgb(245 208 254);}.neutral {  color: rgb(23 23 23);  background-color: rgb(229 229 229);}.dark-cyan {  background-color: rgb(22 78 99);  color: rgb(165 243 252);}.dark-blue {  background-color: rgb(30 58 138);  color: rgb(191 219 254);}.dark-amber {  background-color: rgb(120 53 15);  color: rgb(253 230 138);}.dark-green {  background-color: rgb(20 83 45);  color: rgb(187 247 208);}.dark-red {  background-color: rgb(127 29 29);  color: rgb(254 202 202);}.dark-rose {  background-color: rgb(136 19 55);  color: rgb(254 205 211);}.dark-indigo {  background-color: rgb(49 46 129);  color: rgb(199 210 254);}.dark-orange {  background-color: rgb(136 19 55);  color: rgb(254 215 170);}.dark-emerald {  background-color: rgb(6 78 59);  color: rgb(167 243 208);}.dark-teal {  background-color: rgb(19 78 74);  color: rgb(153 246 228);}.dark-pink {  background-color: rgb(131 24 67);  color: rgb(251 207 232);}.dark-fuchsia {  background-color: rgb(112 26 117);  color: rgb(245 208 254);}.dark-neutral {  background-color: rgb(23 23 23);  color: rgb(229 229 229);}</style><div class="pill"><span class="pill-label dark-indigo"><svg xmlns="http://www.w3.org/2000/svg" class="pill-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">  <path name="cursor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>Profile Views</span><span class="pill-count indigo" >';
	const bsvg = "</span></div></div></foreignObject></svg>";

	//if path api/admin
	if (pathname.startsWith("/api/admin")) {

		//if path contains name and operation parameters
		if (params.has("operation")) {
			
			//list
			if (params.get('operation') == "list") {
				const value = await visitors.list();

				//if empty
				if (value.keys.length == 0) {
					return new Response("EMPTY");
				}
				let str = "";

				//for each key join value
				for (let i = 0 ; i < value.keys.length ; i++) {
					str = str + value.keys[i].name + ": " + await visitors.get((value.keys[i].name)) + "\n";
				}
				return new Response(str);
			}

			//delete all
			else if (params.get('operation') == "delete-all") {
				const value = await visitors.list();
				let str = "Deleted :- \n";

				//for each key delete kv
				for (let i = 0 ; i < value.keys.length ; i++) {
					await visitors.delete((value.keys[i].name));
					str = str + (value.keys[i].name) + "\n";
				}
				return new Response(str);
			}

			//else error
			else {
				return new Response("ERROR: Wrong Parameters");
			}
		}

		//else error
		else {
			return new Response("ERROR: operation parameter missing");
		}
	}

	//if path api
	if (pathname.startsWith("/api")) {

		//if path contains name and operation parameters
		if (params.has("name") && params.has("operation")) {

			//show
			if (params.get("operation") === "show") {
				return new Response(
					asvg + (await visitors.get(params.get("name"))) + bsvg,
					{
						headers: {
							"content-type": "image/svg+xml;charset=UTF-8",
						},
					}
				);
			}

			//increment
			else if (params.get("operation") === "increment") {
				val = await visitors.get(params.get("name"));
				console.log(val);
				
				//if name not present
				if (val == null) {
					var val = 0;
				}

				//else
				val = parseInt(val) + 1;
				await visitors.put(params.get("name"), val);
				return new Response(asvg + (await visitors.get(params.get("name"))) + bsvg, {
					headers: {
						"content-type": "image/svg+xml;charset=UTF-8",
					},
				});
			}

			//reset
			else if (params.get("operation") === "reset") {
				await visitors.put(params.get("name"), 0);
				return new Response((asvg + (await visitors.get(params.get("name"))) + bsvg), {
					headers: {
						'content-type': 'image/svg+xml;charset=UTF-8',
					},
				});
			}

			//update
			else if (params.get("operation") === "update") {
				//update if value parameter present
				if (params.has("value")) {
					await visitors.put(params.get("name"), params.get("value"));
					return new Response((asvg + (await visitors.get(params.get("name"))) + bsvg), {
						headers: {
							'content-type': 'image/svg+xml;charset=UTF-8',
						},
					});
				}

				//else error
				else {
					return new Response("ERROR: value Parameter Missing");
				}
			}

			//delete
			else if (params.get("operation") === "delete") {
				await visitors.delete(params.get("name"));
				return new Response("Deleted: " + params.get("name"));
			}

			//default case
			else {
				return new Response("ERROR: Wrong Parameters");
			}
		}
		return new Response("ERROR: Wrong Parameters");
	}

	return Response.redirect("https://github.com/nishith-p-shetty/visitor-counter");
}
