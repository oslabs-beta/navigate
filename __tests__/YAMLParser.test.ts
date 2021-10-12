import getYAMLData from "../server/yamlParser";

xdescribe("unit tests for YAML parser", () =>{
  const data: any = getYAMLData();

  it("should return a JSON file that has an array", () => {
    expect((data)).toBeInstanceOf(Array);
  });

  it("should return a JSON with k8s-specific fields", () => {
    expect(data[0]["kind"] && data[0]["api"]).toBeTruthy();
  });
});