const groupComponentByType = (addressComponents) => {
    return addressComponents.reduce((accum, addressComponent) => {
        const type = addressComponent.types[0];
        if (accum[type]) {
            return accum;
        } else {
            return {
                ...accum,
                [type]: addressComponent
            }
        }
    }, {});
}

export const extractAddress = (addressComponents)=> {
    const groupedComponents = groupComponentByType(addressComponents);

    const streetNumberComponent = groupedComponents['street_number'];
    const streetNameComponent = groupedComponents['route'];
    const cityNameComponent = groupedComponents['locality'];
    const stateComponent = groupedComponents['administrative_area_level_1'];
    const zipCodeComponent = groupedComponents['postal_code'];

    let street1 = "";
    if (streetNumberComponent) {
        street1 += `${streetNumberComponent.long_name} `;
    }

    if (streetNameComponent) {
        street1 += streetNameComponent.long_name;
    }

    let street2 = "";

    let city = "";
    if (cityNameComponent) {
        city = cityNameComponent.long_name;
    }

    let state = "";
    if (stateComponent) {
        state = stateComponent.short_name;
    }

    let zipCode = "";
    if (zipCodeComponent) {
        zipCode = zipCodeComponent.long_name;
    }

    return { street1, street2, city, state, zipCode }
}
