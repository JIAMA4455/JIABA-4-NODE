import { Command } from 'commander';
import { createReadStream, createWriteStream, access, constants } from 'fs';
import { pipeline } from 'stream/promises';
import { Transform } from 'stream';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { task1, task2, task3, task4, task5 } from './tasks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

program
  .option('-i, --input <path>', 'путь к входному файлу')
  .option('-o, --output <path>', 'путь к выходному файлу')
  .option('-t, --task <task>', 'выбор задачи', true)
  .parse(process.argv);

const options = program.opts();

async function checkFileAccess(path, mode) {
  try {
    await access(path, mode);
    return true;
  } catch {
    return false;
  }
}

async function processStreams() {
  try {
    // Проверяем входной файл
    if (options.input) {
      const canRead = await checkFileAccess(options.input, constants.R_OK);
      if (!canRead) {
        throw new Error(`Не удается прочитать файл: ${options.input}`);
      }
    }

    // Проверяем выходной файл
    if (options.output) {
      const canWrite = await checkFileAccess(options.output, constants.W_OK);
      if (!canWrite) {
        throw new Error(`Не удается записать в файл: ${options.output}`);
      }
    }

    // Определяем входной поток
    const inputStream = options.input
      ? createReadStream(options.input)
      : process.stdin;

    // Определяем выходной поток
    const outputStream = options.output
      ? createWriteStream(options.output)
      : process.stdout;

    // Создаем трансформирующий поток
    const transformStream = new Transform({
      transform(chunk, encoding, callback) {
        try {
          const result = processTask(chunk.toString(), options.task);
          callback(null, result);
        } catch (error) {
          callback(error);
        }
      }
    });

    // Используем pipeline для обработки потоков
    await pipeline(
      inputStream,
      transformStream,
      outputStream
    );

    // Если читаем из консоли, не завершаем процесс
    if (!options.input) {
      console.log('\nВведите новые данные или Ctrl+C для выхода:');
    }
  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
    process.exit(1);
  }
}

function processTask(data, task) {
  switch (task) {
    case 'task1':
      return task1(data);
    case 'task2':
      return task2(data);
    case 'task3':
      return task3(data);
    case 'task4':
      return task4(data);
    case 'task5':
      return task5(data);
    default:
      throw new Error(`Неизвестная задача: ${task}. Доступные задачи: task1, task2, task3, task4, task5`);
  }
}

// Запускаем обработку
processStreams(); 