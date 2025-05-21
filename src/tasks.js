// Здесь будут реализованы различные задачи
export function task1(data) {
  const words = data.trim().split(/\s+/);
  return `Количество слов в тексте: ${words.length}`;
}

export function task2(data) {
  const chars = data.replace(/\s/g, '').length;
  return `Количество символов в тексте (без пробелов): ${chars}`;
}

// Задача 3: Подсчет количества строк в тексте
export function task3(data) {
  const lines = data.split('\n').filter(line => line.trim().length > 0);
  return `Количество непустых строк в тексте: ${lines.length}`;
}

// Задача 4: Подсчет количества гласных букв в тексте
export function task4(data) {
  const vowels = data.toLowerCase().match(/[аеёиоуыэюяaeiouy]/g);
  return `Количество гласных букв в тексте: ${vowels ? vowels.length : 0}`;
}

// Задача 5: Подсчет количества согласных букв в тексте
export function task5(data) {
  const consonants = data.toLowerCase().match(/[бвгджзйклмнпрстфхцчшщbcdfghjklmnpqrstvwxz]/g);
  return `Количество согласных букв в тексте: ${consonants ? consonants.length : 0}`;
}

// Добавьте здесь другие задачи по мере необходимости 