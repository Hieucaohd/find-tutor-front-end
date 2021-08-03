export const getProvinceList = async () => {
    try {
        const response = await fetch("https://provinces.open-api.vn/api/");
        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        console.log('error to get province list: ', error);
    }
}

export const getDistrictList = async (code) => {
    try {
        const response = await fetch(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        console.log('error to get district list: ', error);
    }
}

export const getWardList = async (code) => {
    try {
        const response = await fetch(`https://provinces.open-api.vn/api/d/${code}?depth=2`);
        const responseJSON = await response.json();
        return responseJSON;
    } catch (error) {
        console.log('error to get ward list: ', error);
    }
}