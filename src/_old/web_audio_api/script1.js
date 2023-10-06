(() => {
  const FFT_SIZE = 128;
  const containerEl = document.getElementById("js-container");
  const audioEl = document.getElementById("js-audio");

  const boxes = [];
  for (let i = 0; i < FFT_SIZE / 2; i++) {
    const divEl = document.createElement("div");
    divEl.classList.add("box");
    containerEl.append(divEl);
    boxes[i] = divEl;
  }

  const init = () => {
    const context = new AudioContext();
    const nodeAnalyser = context.createAnalyser();
    nodeAnalyser.fftSize = FFT_SIZE;
    nodeAnalyser.smoothingTimeConstant = 0.85;
    nodeAnalyser.connect(context.destination);

    const nodeSource = context.createMediaElementSource(audioEl);
    nodeSource.connect(nodeAnalyser);

    const loop = () => {
      requestAnimationFrame(loop);
      const freqByteData = new Uint8Array(FFT_SIZE / 2);
      nodeAnalyser.getByteFrequencyData(freqByteData);

      for (let i = 0; i < freqByteData.length; i++) {
        const freqSum = freqByteData[i];
        const scale = freqSum / 256;
        const targetDivEl = boxes[i];
        targetDivEl.style.scale = `1 ${scale}`;
      }
    };

    loop();
  };

  audioEl.addEventListener("play", init);
})();
