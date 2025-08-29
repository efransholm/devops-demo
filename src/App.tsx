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
  const something = 0;

  dayjs.extend(weekOfYear);
  dayjs.extend(isoWeek);
  dayjs.extend(updateLocale);
  dayjs.updateLocale('en', {
    weekStart: 1,
  });

  const currentDate = dayjs();
  const [chosenDate, setChosenDate] = useState<dayjs.Dayjs | null>(currentDate);
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);

  useEffect(() => {
    if (chosenDate?.isoWeek() === 53) setEasterEggMessage('You unlocked the secret week 👀');
    else if (chosenDate?.isoWeek() === 1) setEasterEggMessage('💅🏻 A new beginning... 💅🏻');
  }, [chosenDate]);

  return (
    <Container>
      <Title>Find out which week your date belongs to</Title>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label='Basic date picker' onChange={(newDate) => setChosenDate(newDate)} value={chosenDate} />
        <div>
          {chosenDate ? `The date ${chosenDate.format('YYYY-MM-DD')} belongs to week:` : 'Please select a date.'}
          {chosenDate && <Week>{chosenDate.isoWeek()}</Week>}
        </div>
        <div>{easterEggMessage}</div>
      </LocalizationProvider>
    </Container>
  );
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

const Week = styled.h2`
  font-size: 35px;
  color: #42bbf8ff;
`;

export default App;
