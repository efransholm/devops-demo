import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import styled from '@emotion/styled';

function App() {
  dayjs.extend(weekOfYear);

  const date = dayjs();
  const currentWeek = date.week();
  const [week, setWeek] = useState(currentWeek);

  return (
    <Container>
      <Title>Find out which week your date belongs to</Title>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label='Basic date picker' value={date} />
        <div>WEEK: {week}</div>
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

export default App;
