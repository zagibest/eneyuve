import axios from "axios";

export const getMenu = async (unitId: number) => {
  try {
    const response = await axios.get(
      `https://appathon-back.vercel.app/sisi?unitId=${unitId}`
      // `http://10.10.203.115:3001/sisi?unitId=${unitId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCourseList = async (unitId: number) => {
  try {
    const response = await axios.get(
      `https://appathon-back.vercel.app/data/courses?unitId=${unitId}`

      // `http://10.10.203.115:3001/data/courses?unitId=${unitId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const GenerateSchedule = async (data: any) => {
  try {
    const response = await axios.post(
      `https://appathon-back.vercel.app/calc`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getTeacherList = async (id: number) => {
  try {
    const response = await axios.post(
      `https://stud-api.num.edu.mn/topMenus/EmpForSchedule?unitid=${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSchedule = async (courseId: number, teacherId: number) => {
  try {
    const response = await axios.post(
      `https://stud-api.num.edu.mn/topMenus/TopSchedules?courseid=${courseId}?empid=${teacherId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendImage = async (data: any) => {
  try {
    const response = await axios.post("http://localhost:3001/upload", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
