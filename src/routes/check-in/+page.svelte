<script lang="ts">
  import Nosos from "$lib/components/Nosos.svelte";
  import { checkUser } from "$lib/services/rekognition";
  import { onMount } from "svelte";

  let stream: MediaStream;
  let videoElement: HTMLVideoElement;
  let frame: string | null;
  let isBagre: boolean;
  let pass: boolean = false;
  $: imgSrc = frame;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  async function setStream(): Promise<void> {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 200, height: 200 },
      });

      videoElement.srcObject = stream;
    } catch (error) {
      console.error("error de mierda", error);
    }
  }

  function getFrame() {
    // function captureFrame() {
    const width = videoElement.videoWidth;
    const height = videoElement.videoHeight;
    canvas.width = width;
    canvas.height = height;
    ctx!.drawImage(videoElement, 0, 0, width, height);
    frame = canvas.toDataURL();

    // Aquí puedes hacer algo con el frame, como mostrarlo en un elemento de imagen.
    // }
  }

  function dataURLToUint8Array(dataURL: string): Uint8Array {
    const base64 = dataURL.split(",")[1];
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  onMount(() => {
    setStream();
  });
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
  bind:this={videoElement}
  width="200"
  height="200"
  id="video-face"
  autoplay={true}
  hidden
/>
{#if !imgSrc && !isBagre && !pass}
  <button on:click={getFrame}>SACATE UNA FOTO MAKINOLA</button>
{:else if imgSrc && !isBagre && !pass}
  <!-- <img src={imgSrc} alt="Frame de video" /> -->
  <h1>ALTA FOTELI BOBOTONTO</h1>
  <img src="gigaChad.jpg" width="200" height="200" alt="Frame de video" />
  <button
    class="bn54"
    on:click={async () => {
      if (imgSrc) {
        let bagre = await dataURLToUint8Array(imgSrc);
        isBagre = await checkUser(bagre);
        console.log(isBagre);
        pass = true;
      }
    }}>SERE UN BAGRE SENHOR?</button
  >
{:else if pass && !isBagre && imgSrc}
  <Nosos />
{:else if pass && isBagre && imgSrc}
  <h2>SIIIIIIII</h2>
{/if}

<style>
  .bn54 {
    position: relative;
    outline: none;
    text-decoration: none;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-transform: uppercase;
    height: 45px;
    width: 130px;
    opacity: 1;
    background-color: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.6);
  }

  .bn54 .bn54span {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: #000000;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.7px;
  }

  .bn54:hover {
    animation: bn54rotate 0.7s ease-in-out both;
  }

  .bn54:hover .bn54span {
    animation: bn54storm 0.7s ease-in-out both;
    animation-delay: 0.06s;
  }

  @keyframes bn54rotate {
    0% {
      transform: rotate(0deg) translate3d(0, 0, 0);
    }
    25% {
      transform: rotate(3deg) translate3d(0, 0, 0);
    }
    50% {
      transform: rotate(-3deg) translate3d(0, 0, 0);
    }
    75% {
      transform: rotate(1deg) translate3d(0, 0, 0);
    }
    100% {
      transform: rotate(0deg) translate3d(0, 0, 0);
    }
  }

  @keyframes bn54storm {
    0% {
      transform: translate3d(0, 0, 0) translateZ(0);
    }
    25% {
      transform: translate3d(4px, 0, 0) translateZ(0);
    }
    50% {
      transform: translate3d(-3px, 0, 0) translateZ(0);
    }
    75% {
      transform: translate3d(2px, 0, 0) translateZ(0);
    }
    100% {
      transform: translate3d(0, 0, 0) translateZ(0);
    }
  }
</style>
