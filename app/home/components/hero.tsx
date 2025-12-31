import { Container, Badge } from "react-bootstrap"

export const OpeningHome = () =>{
   return(
  <Container>
          <div className="text-dark text-center py-5 px-3  rounded-3 shadow-lg border border-secondary border-opacity-25 bg-primary bg-opacity-75">
            <div className="py-4">
              <h1
                className="text-uppercase fw-black mb-0"
                style={{ letterSpacing: "4px", fontSize: "2.5rem" }}
              >
                Mastermind
              </h1>

              <div className="d-flex justify-content-center mt-2 mb-4">
                <Badge
                  bg="transparent"
                  className="border border-dark text-dark px-3 py-2 bg-opacity-10"
                  style={{ fontSize: "0.75rem", letterSpacing: "1px" }}
                >
                  SERVERLESS BACKEND · CASE STUDY
                </Badge>
              </div>

              <div
                className="mt-4 p-4 rounded-3 mx-auto  bg-dark"
                style={{
                  maxWidth: "800px",
                }}
              >
                <h3
                  className="fw-bold mb-3 text-info"
                  style={{ fontSize: "1.25rem" }}
                >
                  Engineering Decisions
                </h3>
                <p
                  className="mx-auto text-secondary"
                  style={{
                    maxWidth: 650,
                    lineHeight: "1.6",
                    fontSize: "1.05rem",
                  }}
                >
                  The value of this project lies not in the game itself, but in
                  the{" "}
                  <span className="text-white">
                    design of its underlying system
                  </span>
                  : consistent, defensive, and built to operate under a{" "}
                  <span className="text-info opacity-75">
                    zero-trust model{" "}
                  </span>
                  with untrusted clients.
                </p>
              </div>
            </div>
          </div>
        </Container>
   )
}