import { jwtDecode } from 'jwt-decode';

export const actionIconStyle = (color) => {
    return {
        fontSize: '1.5rem', 
        color: color
    }
}

export const convertToSelectValue = (data) => {
  return data?.map(item => {
    return item.name;
  })
}

export const convertToSelectOption = (arr) => {
  return arr.map(item => {
      return {value: item.name, label: item.name};
  })
}

export const convertStringToKeyValueData = (str) => {
  const arr = str?.replace(/\\n/g, '\n')?.split(/[:\n]/);
  const result = new Array();
  for (let i = 0; i < arr?.length; i+=2) {
    if (arr[i] !== 'serviceCode' && arr[i] !== 'services_code' && arr[i].length > 0){
      result.push({
        id: i,
        key: arr[i],
        value: arr[i+1]
      })
    }
  }
  return result;
}

export const convertKeyValueToString = (arr) => {
  if (arr.length === 0) return "";
  let result = arr[0]?.key + ": " + arr[0]?.value;
  for (let i = 1; i < arr.length; i++) {
    result += "\\n" + arr[i]?.key + ": " + arr[i]?.value;
  }
  return result;
}

export const convertToSeriesData = (type, usersData) => {
  const data = usersData?.map(item => item[type])
  return {
    name: type,
    data: data
  }
}

export const filterData = (nameArr, dataArr) => {
  return dataArr.filter(item => nameArr.includes(item.name));
}

export const fileterUsername = (arr) => {
  return arr?.map(item => item.userName);
}

export const headers = (token) => {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'OPTIONS, DELETE, POST, GET, PATCH, PUT',
    }
}

export const openNotification = (api, type, message, description) => {
  return api[type]({
    message: message,
    description: description,
  });
}

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;  
    return decodedToken.exp < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};