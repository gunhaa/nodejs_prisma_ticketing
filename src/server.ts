import app from './app/app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});