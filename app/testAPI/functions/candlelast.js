// This function is the endpoint's request handler.
exports = function({ query, headers, body}, response) {
  
   
    //If register exists of this QuickTradeStrategy
    
   
    // Data can be extracted from the request as follows:

    // Query params, e.g. '?arg1=hello&arg2=world'
    const state = query ? query.state : null;
    const code = query ? query.code : null;
    const isin = query ? query.isin : null;
    const pname = query ? query.pname : null;
    const pnumber = query ? query.pnumber : null;
    const type = query ? query.type : null;
    const theorical = query ? query.theorical : null;
    const currency = query ? query.currency : null;
    const candles = query ? query.candles : null;
    const tradedirection = query ? query.tradedirection : null;
    const tradestate = query ? query.tradestate : null;
    const airating = query ? query.airating : null;
    const Model1prediction = query ? query.Model1prediction : null;
    const Model2prediction = query ? query.Model2prediction : null;
    const Model3prediction = query ? query.Model3prediction : null;
    
    // Headers, e.g. {"Content-Type": ["application/json"]}
    // const contentTypes = headers["Content-Type"];

    // Raw request body (if the client sent one).
    // This is a binary object that can be accessed as a string using .text()
    // const reqBody = body;

    // console.log("arg1, arg2: ", code, group, state, projection);
    // console.log("Content-Type:", JSON.stringify(contentTypes));
    // console.log("Request body:", reqBody);

    //let stateParam = state
    //if (typeof state === 'undefined') {
    //  stateParam = 'active';
    //}
    
    let stateParam = typeof state !== 'undefined' ? state : '$Pattern.state';

    // Querying a mongodb service:
    const collection = context.services.get("mongodb-atlas").db("atlive").collection("candle_last_patterns"); 
    // Esta parte es para elegir entre las bases de datos que queremos en función de si pone historical=yes o nada
    //const isHistorical = query.historical === "yes"; // Si es no o undefined no es = a "yes" y da False
    //const collectionName = isHistorical ? "candle_patterns" : "candle_last_patterns"; // Si True candle_pattern, si False candle_last_patterns
    //const collection = context.services.get("mongodb-atlas").db("atlive").collection(collectionName);

    let matchQuery = {};
    
    if (state) matchQuery["Pattern.state"] = state;
    if (code) matchQuery["Pattern.code"] = code;
    if (isin) matchQuery["Pattern.isin"] = isin;
    if (pname) matchQuery["Pattern.pattern_name"] = pname;
    if (pnumber) matchQuery["Pattern.pattern_number"] = pnumber;
    if (type) matchQuery["Pattern.type"] = type;
    if (theorical) matchQuery["Pattern.theorical_projection"] = theorical;
    if (currency) matchQuery["Pattern.currency"] = currency;
    if (candles) matchQuery["Pattern.number_of_candles"] = candles;
    if (tradedirection) matchQuery["QuickTradeStrategy.Trade.trade_direction"] = tradedirection;
    if (tradestate) matchQuery["QuickTradeStrategy.Result.quick_trade_status"] = tradestate;
    if (airating) matchQuery["AI_Predictions.ai_pattern_rating"] = airating;
    if (Model1prediction) matchQuery["AI_Predictions.Model1.this_pattern_prediction"] = M1prediction;
    if (Model2prediction) matchQuery["AI_Predictions.Model2.this_pattern_prediction"] = M2prediction;
    if (Model3prediction) matchQuery["AI_Predictions.Model3.this_pattern_prediction"] = M3prediction;
    
    const aggregation = [
      {
        // Campos a verificar
        $match: matchQuery // La query se construye antes
      },
      {
        // Campos a mostrar (nota: no es compatible el método 1 con el 0, hay que elegir)
        $project: {
            "1": "$Pattern.code",
            "2": "$Pattern.asset_name",
            "3": "$Pattern.isin",
            "4": "$Pattern.state",
            "5": "$Pattern.detection_date",
            "6": "$Pattern.pattern_number",
            "7": "$QuickTradeStrategy.Trade.entry_price",
            "8": "$QuickTradeStrategy.Trade.profit_taking_price",
            "9": "$QuickTradeStrategy.Trade.stoploss_price",
            "10": "$AI_Predictions.AI_pattern_rating",
            "11": "$AI_Predictions.Model1.this_pattern_prediction",
            "12": "$AI_Predictions.Model2.this_pattern_prediction",
            "13": "$AI_Predictions.Model3.this_pattern_prediction",
            "14": "$Full_Pattern_Performance.state",
            "15": "$Full_Pattern_Performance.breakout_direction"
          }
      },
    ];
    
    // The return value of the function is sent as the response back to the client when the "Respond with Result" setting is set.
    const results = collection.aggregate(aggregation).toArray();

    return results;
};
