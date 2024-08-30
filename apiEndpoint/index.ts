export const addData = async (currentTab, formData, token) => {
  try {
    const response = await fetch(`/api/data/${currentTab}/POST`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    return result;
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (currentTab) => {
  try {
    const response = await fetch(`/api/data/${currentTab}/GET`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    return result;
  } catch (e) {
    console.log(e);
  }
};

export const updateData = async (
  currentTab: any,
  formData: any,
  token: any
) => {
  try {
    const response = await fetch(`/api/data/${currentTab}/UPDATE`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    return result;
  } catch (e) {
    console.log(e);
  }
};

export const login = async (formData, token) => {
  try {
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    return result;
  } catch (e) {
    console.log(e);
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("token");

    console.log("Logged out successfully");
  } catch (e) {
    console.error("An error occurred during logout:", e);
  }
};
