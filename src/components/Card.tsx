import { Card, CardFooter, CardHeader, CardBody,  Grommet } from "grommet";


export function FlashCard() {
    return (
      <Grommet plain className="App-header">
        <div className="App">
          <Card height="small" width="small" background="light-1">
            <CardHeader pad="medium">Header</CardHeader>
            <CardBody pad="medium">Body</CardBody>
            <CardFooter pad={{horizontal: "small"}} background="light-2"></CardFooter>
          </Card>
        </div>
      </Grommet>
    );
  }