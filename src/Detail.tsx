import React, {FunctionComponent} from "react";
import {Container, Title} from "./Styled";

import {IWordDetail} from './interfaces/APIData'

interface IProps {
    word: IWordDetail
}

const Detail: FunctionComponent<IProps> = props => {
    return (
        <Container color="rgba(10,0,200,0.5)">
            <h1>
                <Title color="white" >
                    Detail about &quot;{props.word.word}&quot;
                </Title>
            </h1>
            <h2>
                <Title color="white">
                    Is related to &quot;{props.word.forWord}&quot;
                </Title>
            </h2>
            <h2>
                <Title color="white">Strength: {props.word.strength}</Title>
            </h2>
        </Container>
    );
};

export default Detail;
