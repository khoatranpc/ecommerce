"use client";
import React, { useEffect, useState } from "react";
import { Select, Space, Form } from "antd";
import axios from "axios";

interface LocationData {
  province_id: string;
  province_name: string;
  district_id: string;
  district_name: string;
  ward_id: string;
  ward_name: string;
}

interface SelectLocationVNProps {
  onChange?: (values: {
    province: string;
    district: string;
    ward: string;
  }) => void;
  initialValue?: {
    province: string | number;
    district: string | number;
    ward: string | number;
  };
}

const SelectLocationVN: React.FC<SelectLocationVNProps> = ({
  onChange,
  initialValue,
}) => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>(
    (initialValue?.province as string) ?? ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState<string>(
    (initialValue?.district as string) ?? ""
  );
  const [selectedWard, setSelectedWard] = useState<string>(
    (initialValue?.ward as string) ?? ""
  );
  const [loading, setLoading] = useState({
    province: false,
    district: false,
    ward: false,
  });

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      setLoading((prev) => ({ ...prev, province: true }));
      const response = await axios.get("https://provinces.open-api.vn/api/p/");
      setProvinces(response.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    } finally {
      setLoading((prev) => ({ ...prev, province: false }));
    }
  };

  const fetchDistricts = async (provinceCode: string) => {
    try {
      setLoading((prev) => ({ ...prev, district: true }));
      const response = await axios.get(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
      );
      setDistricts(response.data.districts);
    } catch (error) {
      console.error("Error fetching districts:", error);
    } finally {
      setLoading((prev) => ({ ...prev, district: false }));
    }
  };

  const fetchWards = async (districtCode: string) => {
    try {
      setLoading((prev) => ({ ...prev, ward: true }));
      const response = await axios.get(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
      );
      setWards(response.data.wards);
    } catch (error) {
      console.error("Error fetching wards:", error);
    } finally {
      setLoading((prev) => ({ ...prev, ward: false }));
    }
  };

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value);
    setSelectedDistrict("");
    setSelectedWard("");
    setDistricts([]);
    setWards([]);
    fetchDistricts(value);
    onChange?.({ province: value, district: "", ward: "" });
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    setSelectedWard("");
    setWards([]);
    fetchWards(value);
    onChange?.({ province: selectedProvince, district: value, ward: "" });
  };

  const handleWardChange = (value: string) => {
    setSelectedWard(value);
    onChange?.({
      province: selectedProvince,
      district: selectedDistrict,
      ward: value,
    });
  };
  useEffect(() => {
    if (initialValue) {
      if (initialValue?.province) {
        fetchDistricts(initialValue!.province as string);
      }
      if (initialValue?.district) {
        fetchWards(initialValue!.district as string);
      }
    }
  }, [initialValue]);
  return (
    <div className="flex flex-col">
      <Form.Item label="Tỉnh/Thành phố" required>
        <Select
          showSearch
          placeholder="Chọn Tỉnh/Thành phố"
          value={selectedProvince}
          onChange={handleProvinceChange}
          loading={loading.province}
          optionFilterProp="children"
          className="w-full"
        >
          {provinces.map((province) => (
            <Select.Option key={province.code} value={province.code}>
              {province.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Quận/Huyện" required>
        <Select
          showSearch
          placeholder="Chọn Quận/Huyện"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          loading={loading.district}
          disabled={!selectedProvince}
          optionFilterProp="children"
          className="w-full"
        >
          {districts.map((district) => (
            <Select.Option key={district.code} value={district.code}>
              {district.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Phường/Xã" required>
        <Select
          showSearch
          placeholder="Chọn Phường/Xã"
          value={selectedWard}
          onChange={handleWardChange}
          loading={loading.ward}
          disabled={!selectedDistrict}
          optionFilterProp="children"
          className="w-full"
        >
          {wards.map((ward) => (
            <Select.Option key={ward.code} value={ward.code}>
              {ward.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </div>
  );
};

export default SelectLocationVN;
