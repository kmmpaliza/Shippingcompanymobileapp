import { Chutes , UpdateChutesStatusRequest} from "../types/chutes"; 


const BASE_URL = import.meta.env.VITE_API_URL;

/** Get all available items. Used to show all data in the dashboard */
export const getAllChutes = async (): Promise<Chutes[]> => {
  const response = await fetch(`${BASE_URL}/status`);

  if (!response.ok) {
    throw new Error("Failed to fetch status list");
  }

  return response.json();
};

/** Get specific item based on Barcode*/
export const getChuteStatusByBarcode = async (
  barcode: string
): Promise<Chutes[]> => {

  const response = await fetch(`${BASE_URL}/status/getByBarcode/${barcode}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch chute status");
  }

  return response.json();
};


/** Get specific item based on ID*/
export const getChuteStatusById= async (
  id: string
): Promise<Chutes[]> => {

  const response = await fetch(`${BASE_URL}/status/getById/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Failed to fetch chute status");
  }

  return response.json();
};

/** Update specific item based on Barcode*/
export const updateChuteStatusByBarcode = async (
  barcode: number,
  request: UpdateChutesStatusRequest
): Promise<Chutes> => {

  const response = await fetch(`${BASE_URL}/updateByBarcode/${barcode}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error("Failed to update status");
  }

  return response.json();
};


/** Update specific item based on ID*/
export const updateChuteStatusByID = async (
  id: number,
  request: UpdateChutesStatusRequest
): Promise<Chutes> => {

  const response = await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error("Failed to update status");
  }

  return response.json();
};