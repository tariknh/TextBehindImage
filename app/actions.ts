export async function getSegment(file: File) {
  if (file) {
    const reader = new FileReader();
    let data;
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(reader.result);
      data = reader.result;
    };
    const response = await fetch("", {
      headers: {
        Authorization: "",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: data,
    });
    const result = await response.json();
    return result;
  }
}
