import React, { Component } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import { fetchAppointments } from "../../actions/appointment";
import { connect } from "react-redux";
import LinkButton from "../LinkButton";
import styled from "styled-components";
import history from "../../history";

const Card = styled.div`
  width: 90vw;
  height: 25vh;
  border-radius: 10px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.25);
  margin: 10px;
  border-left: solid 8px #f47a20;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Img = styled.img`
  height: auto;
  width: 25vw;
  padding: 5px;
`;

const Button = styled.button`
  height: 4vh;
  width: 90%;
  border: solid 0.1em #f47a20;
  background-color: white;
  border-radius: 0.3rem;
`;

const FlexWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
`;

const TextWrap = styled.div`
  width: 65%;

  > p {
    margin: 0.5em;
  }
`;
const Crisis = styled.p`
  font-size: 0.8rem;
  padding: 0.8em;
`;

class Profile extends Component {
  render() {
    if (!this.props.apts) {
      return <div>You have no appointments booked!</div>;
    } else {
      return (
        <div>
          <Header heading="My Appointments" logout />
          <FlexWrap>
            {this.props.apts.map(apt => {
              const dates = this.convertDates(apt.date_and_time);
              return (
                <Card key={apt.chat_string}>
                  <div>
                    <Img src={apt.img_url} />
                  </div>
                  <TextWrap>
                    <p>{apt.name}</p>
                    <p>{dates[0]}</p>
                    <p>{dates[1]}</p>
                    <a href={"https://tlk.io/" + apt.chat_string}>
                      <Button>join chat</Button>
                    </a>
                  </TextWrap>
                </Card>
              );
            })}
          </FlexWrap>
          <LinkButton text="new appointment" url="/topics" primary />

          <p>
            Immediate crisis? Don't use this site -{" "}
            <Link to="/crisis">use these resources instead</Link>
          </p>
        </div>
      );
    }
  }

  componentDidMount() {
    this.props.fetchAppointments();
  }

  convertDates = date => {
    const dateOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };
    const dateObj = new Date(date);
    const dateStr = dateObj.toLocaleString("en-gb", dateOptions);
    const timeStr = dateObj.toLocaleString("en-gb", timeOptions);
    return [dateStr, timeStr];
  };
}

const mapStateToProps = state => {
  return {
    apts: state.userApts.apts
  };
};

export default connect(mapStateToProps, { fetchAppointments })(Profile);
