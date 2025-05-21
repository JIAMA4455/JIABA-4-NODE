import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import taskRouter from './tasks/task.router';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/tasks', taskRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 