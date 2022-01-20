const root = notNil(document.getElementById("app"));

type Display = {
  updateContent: (content: string) => void;
  updateTitle: (title: string) => void;
};

export function createDisplay(title: string): Display {
  const elem = document.createElement("div");
  const titleEl = document.createElement("h2");
  titleEl.innerText = title;
  elem.appendChild(titleEl);
  const preEl = document.createElement("pre");
  elem.appendChild(preEl);
  root.appendChild(elem);
  return {
    updateContent: (content: string) => {
      preEl.innerHTML = content;
    },
    updateTitle: (title: string) => {
      titleEl.innerHTML = title;
    },
  };
}

function notNil<T>(val: T | null | undefined): T {
  if (val === null || val === undefined) {
    throw new Error("Unexpected null or undefined");
  }
  return val;
}
