import { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import styled from '@emotion/styled';
import updateLocale from 'dayjs/plugin/updateLocale';
import isoWeek from 'dayjs/plugin/isoWeek';

function App() {
  dayjs.extend(weekOfYear);
  dayjs.extend(isoWeek);
  dayjs.extend(updateLocale);
  dayjs.updateLocale('en', {
    weekStart: 1,
  });

  const currentDate = dayjs();
  const [chosenDate, setChosenDate] = useState<dayjs.Dayjs>(currentDate);
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);

  useEffect(() => {
    if (chosenDate?.isoWeek() === 53) setEasterEggMessage('You unlocked the secret week 👀');
    else if (chosenDate?.isoWeek() === 1) setEasterEggMessage('💅🏻 A new beginning... 💅🏻');
  }, [chosenDate]);

  return (
    <Container>
      <Title>Find out which week your date belongs to</Title>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateContainer>
          <StyledButton
            onClick={() => {
              const newDate = decreaseDate(chosenDate);
              newDate && setChosenDate(newDate);
            }}
          >
            -
          </StyledButton>
          <DatePicker
            label='Basic date picker'
            onChange={(newDate) => newDate && setChosenDate(newDate)}
            value={chosenDate}
          />
          <StyledButton
            onClick={() => {
              const newDate = increaseDate(chosenDate);
              newDate && setChosenDate(newDate);
            }}
          >
            +
          </StyledButton>
        </DateContainer>
        <div>
          {chosenDate ? `The date ${chosenDate.format('YYYY-MM-DD')} belongs to week:` : 'Please select a date.'}
          {chosenDate && <Week>{chosenDate.isoWeek()}</Week>}
        </div>
        <div>{easterEggMessage}</div>
      </LocalizationProvider>
    </Container>
  );
}

export function decreaseDate(newDate: dayjs.Dayjs) {
  if (newDate) return newDate.subtract(1, 'day');
}

export function increaseDate(newDate: dayjs.Dayjs) {
  if (newDate) return newDate.add(1, 'day');
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  height: 100vh;
  gap: 30px;
`;

const Title = styled.h1`
  font-size: 50px;
  max-width: 600px;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #42bbf8ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  width: 40px;
  height: 40px;
  cursor: pointer;

  &:hover {
    background-color: #1e90ffff;
  }
`;

const Week = styled.h2`
  font-size: 35px;
  color: #42bbf8ff;
`;

export default App;
