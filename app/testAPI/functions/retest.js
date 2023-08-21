// This function is the endpoint's request handler.
exports = function({ query, headers, body}, response) {
    // Data can be extracted from the request as follows:

    const {timeframe, group} = query  || {}; // Parámetros de la Query. Ej:  '?code=AAPL.US&isin=US0000000001' => {code: "AAPL.US", isin: "US0000000001"}
    const contentTypes = headers["Content-Type"] && headers["Content-Type"]; // Esto lo usará para ver autenticación y rollos así que se han definido en otro lugar
    const reqBody = body || {}; // Esto no aplica a las GET, solo si el cliente envía un fichero de datos para modificar algo

    let timeframeParam = typeof timeframe !== 'undefined' ? timeframe : 'daily';
    let groupParam = typeof group !== 'undefined' ? group : '*';
    
    console.log("timeframe, group: ", timeframeParam, groupParam);
    console.log("Content-Type:", JSON.stringify(contentTypes));
    console.log("Request body:", reqBody);

    // Parametros
    const aggregation = [
        {
            $match: {
                "Pattern.timeframe": timeframeParam,
                ...(typeof group !== 'undefined' ? { "Pattern.group": group } : {}),
            },
        },
    ];

    // Querying a mongodb service:
    const doc = context.services.get("mongodb-atlas").db("atlive").collection("candle_pattern").findOne();

    // The return value of the function is sent as the response back to the client when the "Respond with Result" setting is set.
    return  doc;
};
