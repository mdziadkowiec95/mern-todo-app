exports.convertUploadFileName = originalFileName => {
    const originalNameArr = originalFileName.split('.');
    const extenstion = originalNameArr[originalNameArr.length - 1];
    const originalNameNoExtension = originalNameArr.slice(0, originalNameArr.length - 1).join('');    
    const fileName = new Date().toISOString() + originalNameNoExtension;
    const noSpecialCharsFileName = `${fileName.replace(/[^\w\s]/gi, '')}.${extenstion}`;
    
    return noSpecialCharsFileName;
}
