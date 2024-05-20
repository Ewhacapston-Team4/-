import { useEffect } from "react";
import * as Speech from "expo-speech";

const TTS = {
  listAllVoiceOptions: async () => {
    let voices = await Speech.getAvailableVoicesAsync();
    console.log(voices);
  },

  speak: (thingToSay) => {
    options = {
      // voice: "ko-kr-x-koc-network",
      voice: "ko-kr-x-kod-local",
      //voice: "ko-kr-x-ism-local",
      //voice: "ko-kr-x-kob-network",
      //voice: "ko-KR-language",
      // voice: "ko-kr-x-kod-network",
      // voice: "ko-kr-x-koc-local",
      //voice: "ko-kr-x-kob-local",
      //voice: "ko-kr-x-ism-network",
    };
    Speech.speak(thingToSay, options);
  },
};

export default TTS;
