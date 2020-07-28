export class TransformService {
    static fbObjectToArray(fbData) {

        const array = Object.keys(fbData).map( fbKey => _transform(fbKey, fbData));

        return array;
    }
}

function _transform(fbKey, fbData) {
    const dataInf = fbData[fbKey];
    dataInf['id'] = fbKey;
    return dataInf
} 