
export const getMflApiEndpoint = () => {
	return "https://z519wdyajg.execute-api.us-east-1.amazonaws.com/prod/";
}

export const getApiEndpoint = () => {
	if (window.location.hostname === "localhost"
		|| window.location.hostname === "127.0.0.1"
		|| window.location.hostname === "") {
		return "http://127.0.0.1:5000/";
	}
	return "https://api." + window.location.hostname.replace("www.", "") + "/";
}

export const getGraphQLEndpoint = () => {
	return getApiEndpoint() + "graphql";
}