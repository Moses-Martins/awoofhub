import { GOOGLE_MAP_API_KEY } from "@/config/constants";
import { useState } from "react";
import { Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export const GoogleInputField = ({
  label,
  value,
  onChangeText,
  error,
  compulsory,
  onPlaceSelect,
}: any) => {
  const [focused, setFocused] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  return (
    <View className="mb-4 w-full">
      {label && (
        <Text className="font-baloo text-lg font-semibold text-slate-800 mb-2">
          {label}
          {compulsory && <Text className="text-red-500"> *</Text>}
        </Text>
      )}

      <GooglePlacesAutocomplete
        placeholder="Search location"
        fetchDetails
        debounce={300}
        textInputProps={{
          value: value || "",

          onFocus: () => setFocused(true),
          onBlur: () => setFocused(false),

          onChangeText: (text) => {
            onChangeText(text);  
            setSelectedPlace(null); 
          },
        }}
        onPress={(data, details = null) => {
          const place = {
            description: data.description,
            placeId: data.place_id,
            lat: details?.geometry?.location?.lat,
            lng: details?.geometry?.location?.lng,
          };

          setSelectedPlace(place);
          onChangeText(data.description);
          onPlaceSelect?.(place);
        }}
        query={{
          key: GOOGLE_MAP_API_KEY,
          language: "en",
        }}
        styles={{
          container: { flex: 0 },

         textInputContainer: {
            backgroundColor: "#F6F7F8",
            borderWidth: 1,
            borderColor: error
              ? "#EF4444"
              : focused
              ? "#F97316"
              : "#94A3B8",
            borderRadius: 6,
            height: 48,           
            justifyContent: "center",
            alignItems: "center",    
            paddingHorizontal: 4,   
          },

          textInput: {
            backgroundColor: "transparent", 
            fontSize: 16,
            fontFamily: "Baloo",
            color: "#0F172A",
            width: "100%",               
            marginTop: 5,              
            paddingVertical: 0,         
            textAlignVertical: "center",   
          },

          listView: {
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: "#E2E8F0",
            marginTop: 4,
            borderRadius: 6,
            zIndex: 999,
          },

          description: {
            color: "#0F172A",
          },
        }}
      />

      {/* ERROR */}
      {error?.message && (
        <Text className="text-red-500 text-xs mt-1">
          {error.message}
        </Text>
      )}
    </View>
  );
};