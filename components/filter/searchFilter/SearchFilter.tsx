import { COLORS } from '@/theme/colors';
import { SearchBar, SearchIcon, SearchInput } from './styles';

type SearchFilterProps = {
  searchValue: string;
  onChangeText: (text: string) => void;
};

const SearchFilter = ({ searchValue, onChangeText }: SearchFilterProps) => {
  return (
    <SearchBar>
      <SearchIcon name="search" size={18} />
      <SearchInput
        placeholder="Pesquisar"
        placeholderTextColor={COLORS.grayMedium}
        value={searchValue}
        onChangeText={onChangeText}
        returnKeyType="search"
      />
    </SearchBar>
  );
};

export default SearchFilter;
