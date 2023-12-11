import {
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  Box,
  Button,
  ButtonIcon,
  CheckCircleIcon,
  CloseIcon,
  HStack,
  MenuIcon,
  SearchIcon,
  Text,
} from '@gluestack-ui/themed';
import { Dispatch, SetStateAction, useState } from 'react';
import { Keyboard, LayoutAnimation, StyleSheet, TextInput, TextInputSelectionChangeEventData } from 'react-native';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';

export const KeyBoardAccessory = ({
  inputRef,
  selection,
  setSelection,
}: {
  inputRef: React.RefObject<TextInput>;
  selection: TextInputSelectionChangeEventData['selection'];
  setSelection: Dispatch<SetStateAction<TextInputSelectionChangeEventData['selection']>>;
}) => {
  return (
    <KeyboardAccessoryView
      heightProperty='minHeight'
      androidAdjustResize
      style={{ backgroundColor: '#00000000', borderWidth: 0 }}
    >
      {({ isKeyboardVisible }) => <Detail {...{ inputRef, selection, setSelection }} />}
    </KeyboardAccessoryView>
  );
};

const Detail = ({
  inputRef,
  selection,
  setSelection,
}: {
  inputRef: React.RefObject<TextInput>;
  selection: TextInputSelectionChangeEventData['selection'];
  setSelection: Dispatch<SetStateAction<TextInputSelectionChangeEventData['selection']>>;
}) => {
  const [searchResult, setSearchResult] = useState<string[] | undefined>(undefined);
  const [isSearch, setIsSearch] = useState(searchResult ? true : false);

  return (
    <>
      <Box flex={1} backgroundColor='tranparent' h={'$12'}>
        <HStack flex={1} bgColor={'$backgroundLight800'} m={'$1'} p={'$0.5'} borderRadius={'$md'}>
          <HStack w='$full' justifyContent='space-between'>
            <HStack gap={'$0.5'}>
              {isSearch && (
                <>
                  <Button
                    size='xs'
                    onPress={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      LayoutAnimation.configureNext({
                        duration: 100,
                        create: { type: 'linear', property: 'opacity' },
                        update: { type: 'linear', property: 'opacity' },
                        delete: { type: 'linear', property: 'opacity' },
                      });
                      if (searchResult && searchResult?.length > 0) {
                        setSearchResult(undefined);
                      } else if (isSearch) {
                        setIsSearch(false);
                      }
                    }}
                    bgColor='$blueGray300'
                    w={'$9'}
                    h={'$9'}
                    sx={{
                      ':active': {
                        bgColor: '$blueGray200',
                      },
                    }}
                  >
                    <ButtonIcon as={ArrowLeftIcon} color='#000' size='md' />
                  </Button>

                  <Box
                    height={'100%'}
                    width={searchResult && searchResult?.length > 0 ? '55%' : '65%'}
                    position='relative'
                  >
                    <TextInput
                      style={{
                        flex: 1,
                        borderRadius: 999,
                        borderColor: '#111',
                        backgroundColor: '#000',
                        color: '#fff',
                        paddingHorizontal: 20,
                      }}
                      blurOnSubmit={false}
                      returnKeyType='done'
                      autoFocus={true}
                      onBlur={(e) => e.preventDefault()}
                    />

                    {searchResult && searchResult?.length > 0 && (
                      <Box
                        flex={1}
                        bg={'$black'}
                        rounded={'$md'}
                        justifyContent='center'
                        alignItems='center'
                        style={StyleSheet.absoluteFillObject}
                      >
                        <Text>result: {searchResult.length}件</Text>
                      </Box>
                    )}
                  </Box>
                </>
              )}

              {searchResult && searchResult?.length > 0 ? (
                <>
                  <Button
                    size='xs'
                    onPress={() => {
                      let newSelection = { start: 0, end: 0 };
                      if (selection.start === selection.end) {
                        newSelection = { start: selection.start - 1, end: selection.end - 1 };
                      } else {
                        newSelection = { start: selection.start, end: selection.end - 1 };
                      }

                      inputRef.current?.setNativeProps({
                        selection: newSelection,
                      });
                      setSelection(newSelection);
                    }}
                    bgColor='$blueGray300'
                    w={'$9'}
                    h={'$9'}
                    sx={{
                      ':active': {
                        bgColor: '$blueGray200',
                      },
                    }}
                  >
                    <ButtonIcon as={ArrowUpIcon} color='#000' size='md' />
                  </Button>

                  <Button
                    size='xs'
                    onPress={() => {
                      let newSelection = { start: 0, end: 0 };
                      if (selection.start === selection.end) {
                        newSelection = { start: selection.start + 1, end: selection.end + 1 };
                      } else {
                        newSelection = { start: selection.start, end: selection.end + 1 };
                      }

                      inputRef.current?.setNativeProps({
                        selection: newSelection,
                      });
                      setSelection(newSelection);
                    }}
                    bgColor='$blueGray300'
                    w={'$9'}
                    h={'$9'}
                    sx={{
                      ':active': {
                        bgColor: '$blueGray200',
                      },
                    }}
                  >
                    <ButtonIcon as={ArrowDownIcon} color='#000' size='md' />
                  </Button>
                </>
              ) : (
                <Button
                  size='xs'
                  onPress={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    if (isSearch) {
                      setSearchResult(['hoge', 'fuga']);
                    } else {
                      setIsSearch(true);
                    }
                  }}
                  bgColor='$blueGray300'
                  w={'$9'}
                  h={'$9'}
                  sx={{
                    ':active': {
                      bgColor: '$blueGray200',
                    },
                  }}
                >
                  <ButtonIcon as={SearchIcon} color='#000' size='md' />
                </Button>
              )}
            </HStack>

            <HStack gap={'$0.5'}>
              {!isSearch && (
                <>
                  <Button
                    size='xs'
                    onPress={() => {
                      let newSelection = { start: 0, end: 0 };
                      if (selection.start === selection.end) {
                        newSelection = { start: selection.start - 1, end: selection.end - 1 };
                      } else {
                        newSelection = { start: selection.start, end: selection.end - 1 };
                      }

                      inputRef.current?.setNativeProps({
                        selection: newSelection,
                      });
                      setSelection(newSelection);
                    }}
                    bgColor='$blueGray300'
                    w={'$9'}
                    h={'$9'}
                    sx={{
                      ':active': {
                        bgColor: '$blueGray200',
                      },
                    }}
                  >
                    <ButtonIcon as={ArrowLeftIcon} color='#000' size='md' />
                  </Button>

                  <Button
                    size='xs'
                    onPress={() => {
                      let newSelection = { start: 0, end: 0 };
                      if (selection.start === selection.end) {
                        newSelection = { start: selection.start + 1, end: selection.end + 1 };
                      } else {
                        newSelection = { start: selection.start, end: selection.end + 1 };
                      }

                      inputRef.current?.setNativeProps({
                        selection: newSelection,
                      });
                      setSelection(newSelection);
                    }}
                    bgColor='$blueGray300'
                    w={'$9'}
                    h={'$9'}
                    sx={{
                      ':active': {
                        bgColor: '$blueGray200',
                      },
                    }}
                  >
                    <ButtonIcon as={ArrowRightIcon} color='#000' size='md' />
                  </Button>

                  <Button
                    size='xs'
                    onPress={() => {
                      console.info('');
                    }}
                    bgColor='$blueGray300'
                    w={'$9'}
                    h={'$9'}
                    sx={{
                      ':active': {
                        bgColor: '$blueGray200',
                      },
                    }}
                  >
                    <ButtonIcon as={ArrowUpIcon} color='#000' size='md' />
                  </Button>

                  <Button
                    size='xs'
                    onPress={() => {
                      console.info('');
                    }}
                    bgColor='$blueGray300'
                    w={'$9'}
                    h={'$9'}
                    sx={{
                      ':active': {
                        bgColor: '$blueGray200',
                      },
                    }}
                  >
                    <ButtonIcon as={ArrowDownIcon} color='#000' size='md' />
                  </Button>
                </>
              )}

              <Button
                size='xs'
                onPress={Keyboard.dismiss}
                bgColor='$green600'
                w={'$9'}
                h={'$9'}
                sx={{
                  ':active': {
                    bgColor: '$green500',
                  },
                }}
              >
                <ButtonIcon as={CheckCircleIcon} color='#ddd' size='md' />
              </Button>
            </HStack>
          </HStack>
        </HStack>
      </Box>
    </>
  );
};
