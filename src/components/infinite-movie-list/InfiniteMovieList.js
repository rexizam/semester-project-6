import { useEffect, useRef } from 'react';

import {
  InfiniteLoader,
  List,
  WindowScroller,
  AutoSizer,
} from 'react-virtualized';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { getRowsAmount, generateIndexesForRow } from './Utils';
import './infiniteMoviesList.scss';

const InfiniteMovieList = (
  {
    itemWidth = 320,
    itemHeight = 450,
    hasMore = false,
    items = [],
    reset = false,
    isFetching = false,
    fetchItems = () => {},
    children,
  }) => {

  const infiniteLoaderRef = useRef(null);

  useEffect(() => {
    if (reset && infiniteLoaderRef.current) {
      infiniteLoaderRef.current.resetLoadMoreRowsCache(true);
    }
  }, [reset, infiniteLoaderRef]);

  const loadMoreRows = async () => {
    if (!isFetching) {
      fetchItems();
    }
  };

  const noRowsRenderer = () => (
    <Grid item>
      <Typography className={'text-center'}>No movies found</Typography>
    </Grid>
  );

  return (
    <section>
      <AutoSizer disableHeight>
        {({ width: rowWidth }) => {
          const rowCount = getRowsAmount(
            rowWidth,
            itemWidth,
            items.length,
            hasMore,
          );

          return (
            <InfiniteLoader
              ref={infiniteLoaderRef}
              rowCount={rowCount}
              isRowLoaded={({ index }) => {
                const allItemsLoaded =
                  generateIndexesForRow(
                    index,
                    rowWidth,
                    itemWidth,
                    items.length,
                  ).length > 0;

                return !hasMore || allItemsLoaded;
              }}
              loadMoreRows={loadMoreRows}
              minimumBatchSize={20}
              threshold={20}
            >
              {({ onRowsRendered, registerChild }) => (
                <WindowScroller>
                  {({ height, scrollTop }) => (
                    <List
                      className={'grid'}
                      autoHeight
                      ref={registerChild}
                      height={height}
                      scrollTop={scrollTop}
                      width={rowWidth}
                      rowCount={rowCount}
                      rowHeight={itemHeight}
                      onRowsRendered={onRowsRendered}
                      rowRenderer={({ index, style, key }) => {
                        const itemsForRow = generateIndexesForRow(
                          index,
                          rowWidth,
                          itemWidth,
                          items.length,
                        ).map((itemIndex) => items[itemIndex]);

                        return (
                          <div style={style} key={key} className={'gridRow'}>
                            {itemsForRow.map((item, itemIndex) => (
                              <Grid
                                item
                                className={'gridItem'}
                                style={{ width: itemWidth }}
                                key={itemIndex}
                              >
                                {children(item)}
                              </Grid>
                            ))}
                          </div>
                        );
                      }}
                      noRowsRenderer={noRowsRenderer}
                    />
                  )}
                </WindowScroller>
              )}
            </InfiniteLoader>
          );
        }}
      </AutoSizer>
    </section>
  );
};

export default InfiniteMovieList;