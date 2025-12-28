import { Card } from "react-bootstrap"

interface propsStatCard {
  value: number;
  label: string;
}
export const StatCard = (props:propsStatCard ) =>{
   return(
          <Card
              className="h-100 border-0 shadow-lg bg-primary text-white overflow-hidden"
              style={{ minHeight: "150px" }}
            >
              <Card.Body className="d-flex flex-column justify-content-center align-items-center position-relative">
                <div className="display-1 fw-black mb-0">{props.value}</div>
                <div className="h5 opacity-75 text-center text-uppercase ls-wide">
                  {props.label}
                </div>
              </Card.Body>
            </Card>
   )
}