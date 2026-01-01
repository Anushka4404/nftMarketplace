
export const getTopCreators = (creators)=> {
    const finalCreators = [];

    const finalResults = creators.reduce((index, currentValue)=> {
    //     const seller = currentValue.seller;
    //     (index[currentValue.seller] == index[currentValue.seller] || []).push(
    //         currentValue
    //     );

    //     return index;
    // }, {});
     const seller = currentValue.seller;

    // initialize array if it doesn't exist
    if (!index[seller]) {
      index[seller] = [];
    }

    index[seller].push(currentValue);
    return index;
  }, {});

    Object.entries(finalResults).forEach((item)=> {
        const seller = item[0];
        const total = item[1]
            .map((newItem)=> Number(newItem.price))
            .reduce((
                previousValue, currentValue) => previousValue + currentValue, 
                0
            );

        finalCreators.push({ seller, total });
    });

    return finalCreators;
};