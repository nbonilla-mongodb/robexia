exports = function({ headers }, response) {
  
    // Querying a mongodb service:
    const collection = context.services.get("mongodb-atlas").db("atlive").collection("candle_last_response"); 
    
    // Obtener el único documento de la colección
    return collection.findOne();
};