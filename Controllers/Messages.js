
const newProductMessage = (userName, productName, dateDebut) => {
    const bienvenueMessage = `Bonjour *${userName}* !
    
    Nous avons remarqué avec enthousiasme que vous avez récemment ajouté un nouveau produit *${productName}* à votre plan de production, prévu pour le *${dateDebut}*. C'est une excellente nouvelle !
    Nous sommes là pour vous soutenir tout au long de ce processus et vous fournir des conseils pratiques qui vous aideront à cultiver ce produit avec succès.
    
    Que ce soit des astuces, des recommandations ou des conseils sur la production du *${productName}*, nous sommes là pour vous accompagner.
    
    Nous avons hâte de collaborer avec vous et de partager nos connaissances pour vous aider à obtenir des résultats exceptionnels avec ce nouveau produit.
    
    Cordialement,
    [ *AgriTech* ]`;

    return bienvenueMessage;
};

const onProductionDate = (userName, cycle, productName) => {
    const message = `Bonjour *${userName}*, 
    Nous supposons que vous avez atteint ou êtes sur le point d'atteindre l'étape de *${cycle}* de la culture *${productName}*. 
    Continuez votre excellent travail et préparez-vous pour cette étape passionnante !
    [ *AgriTech* ]`;
    return message;
};

const OnProductionDateIo = (username, cycle, productName, io) => {
    io.emit(
        "OnProductionDate",
        `L'agriculteur ${username} est arrivé a l'etape de ${cycle} du produit ${productName}.`
    );
}

module.exports = { newProductMessage, onProductionDate, OnProductionDateIo };
