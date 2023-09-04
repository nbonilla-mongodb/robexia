// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
    // Data can be extracted from the request as follows:

    // Query params, e.g. '?arg1=hello&arg2=world'
    const isin = query ? query.ISIN : null;
    // const isin = 'ES0SI0000005';

    // Si no se proporciona ISIN, devolver null
    if (!isin) {
            console.log('ISIN no proporcionado, devolviendo null.');
            return null;
     }
        
    // Querying a mongodb service:
    const collection = context.services.get("mongodb-atlas").db("Classic").collection("ATFusionES"); 
    
    let matchQuery = {};
    
    // Comprobar si ISIN está en la consulta y construir la consulta en consecuencia
    if (isin) matchQuery["ISIN"] = isin;

    const aggregation = [
      {
        // Campos a verificar
        $match: matchQuery // La query se construye antes
      },
      {
        // Campos a mostrar (nota: no es compatible el método 1 con el 0, hay que elegir)
        $project:
          {
           "XS": "$Cabecera.Tendencia_Muy_Corto",
           "S": "$Cabecera.Tendencia_Corto",
           "M": "$Cabecera.Tendencia_Medio",
           "L": "$Cabecera.Tendencia_Largo"
          },
      },
    ];
    
    // The return value of the function is sent as the response back to the client when the "Respond with Result" setting is set.
    const results = await collection.aggregate(aggregation).toArray();

    // Si no se encontraron resultados, devolver null
    if (results.length === 0) {
            console.log(`ISIN ${isin} no encontrado, devolviendo null.`);
            return null;
    }

    return results;
};
